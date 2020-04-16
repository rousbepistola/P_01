
      // geocode();
      // GET LOCATION FORM
      var locationForm = document.getElementById('location-form');
      // listen for submit
      locationForm.addEventListener('submit', geocode)
      function geocode(e){
      // prevent actual submit
      e.preventDefault();
      let location = document.getElementById('location-input').value;

      
      // let location = '70 bradstone sq scarborough';
      axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
      params:{
      address: location,
      key: 'AIzaSyCFpf4F_1DzzQmZrf3xsNggEibIQixO0k8'
      }
      })
      .then(function(response){
        let airQualityOutput2 =  document.getElementById('airQualityOutput2');
        airQualityOutput2.innerHTML = "";
      // log full response
      console.log(response);
      // formatted address
      let formattedAddress = response.data.results[0].formatted_address;
      let formattedAddressOutput = `
      <ul>
      <li>${formattedAddress}</li>
      </ul>
      `;
      // ADDRESS COMPONENTS
      let addressComponents = response.data.results[0].address_components;
      let addressComponentsOutput = '<ul>';
      for(let i = 0; i < addressComponents.length; i++){
      addressComponentsOutput += `
      <li>${addressComponents[i].types[0]} :  ${addressComponents[i].long_name}</li>
      `;
      }
      addressComponentsOutput += '</ul>'
      // Geometry
      let lat = response.data.results[0].geometry.location.lat;
      let lng = response.data.results[0].geometry.location.lng;
      let geometryOutput = `
      <ul>
      <li><strong>Latitude: </strong><span id="latResult">${lat}</span></li>
      <li><strong>Longitude: </strong><span id="lngResult">${lng}</span></li>
      </ul>
      `;
      // OUTPUT TO APP
      document.getElementById('formatted-address').innerHTML = formattedAddressOutput;
      document.getElementById('address-components').innerHTML = addressComponentsOutput;
      document.getElementById('geometry').innerHTML = geometryOutput;
      })
      .catch(function(error){
      console.log(error);
      })

      }


       //------------------ CODE FOR AIR QUALITY-------------------------------------
      function airQuality(){

        let airLat = document.getElementById('latResult').innerHTML;
        let airLng = document.getElementById('lngResult').innerHTML;
        let airQualityOutput =  document.getElementById('airQualityOutput');
        airQualityOutput.innerHTML = "Loading Information";
        axios({
            "method":"GET",
            "url":"https://ambee-air-quality.p.rapidapi.com/latest/by-lat-lng",
            "headers":{
            "content-type":"application/octet-stream",
            "x-rapidapi-host":"ambee-air-quality.p.rapidapi.com",
            "x-rapidapi-key":"2e0f4c1489mshd0a4382ec92e089p14e41bjsnef78ff4ef206"
            },"params":{
            "limit":"10",
            "lng":airLng,
            "lat":airLat
            }
            })
            .then((response)=>{
              let airQualityData = response.data.stations[0];
              console.log(airQualityData);
            //-   let airQualityOutput = '<ul>';
            //- for(let i = 0; i < response.data.stations[0].length; i++){
            //- airQualityOutput += `
            //- <li>${response.data.stations[0][i].types[0]} :  ${addressComponents[i].long_name}</li>
            //- `;


              airQualityOutput.innerHTML = `
                <ul>
                    <li>${airQualityData.countryCode}</li>
                    <li>Updated Last: ${airQualityData.updatedAt}</li>
                    <li>${airQualityData.city}</li>
                    <li>Test center: ${airQualityData.division}</li>
                    <li>${airQualityData.placeName}</li>
                    <li class = "text-success"><strong>${airQualityData.aqiInfo}</strong></li>
                    <li> DIstance from test center: ${airQualityData.distance}km</li>
                    
                </ul>
              `
            })
            .catch((error)=>{
              console.log(error)
              airQualityOutput.innerHTML = `<h4 class="text-warning">Failed to fetch data. Please try again</h4>`
            })
                
      }
      //END ------------------ CODE FOR AIR QUALITY END-------------------------------------



      //------------------ CODE FOR CRIME RATE -------------------------------------
      //----------------------https://data.torontopolice.on.ca/datasets/neighbourhood-crime-rates-boundary-file-/geoservice?geometry=-79.657%2C43.795%2C-79.004%2C43.882------
      //api BY TORONTO GOVERNMENT
      //- NOTE: 0.01 degree difference in lng lat == 1.1132 km
      //Created Home upper and lower limit for Lat and Lng to see approx 5.5km radius if any crime is reported

      function crimeNow(){
        let crimeOutput = document.getElementById('crimeRateOutput');
        crimeOutput.innerHTML = "";

  

      //- ===========================================Car Theft=============================================================== 
      axios({
            "method":"GET",
            "url":"https://services.arcgis.com/S9th0jAJ7bqgIRjw/arcgis/rest/services/Neighbourhood_MCI/FeatureServer/0/query?where=1%3D1&outFields=AutoTheft_2019&outSR=4326&f=json"
            })
            .then((response)=>{
              //- response.data.features[0].geometry
              
              let totalCrimes = response.data.features;
              console.log(response.data.features.length,response.data.features );
              let homeLat = parseFloat(document.getElementById('latResult').innerHTML);
              let homeLng =  parseFloat(document.getElementById('lngResult').innerHTML);
              let homeLatUpper = homeLat + 0.03;
              let homeLatLower = homeLat - 0.03;
              let homeLngUpper = homeLng+ 0.03;
              let homeLngLower = homeLng - 0.03;
              let crimeScene;
              let carTheftCount = 0;


            for(let i = 0; i < totalCrimes.length; i++){
              for(let j = 0; j < totalCrimes[i].geometry.rings[0].length; j++ ){

                let crimeLng = response.data.features[i].geometry.rings[0][j][0];
                let crimeLat = response.data.features[i].geometry.rings[0][j][1];

                //- if (((crimeLat <= homeLatUpper) && (crimeLat >= homeLatLower)) && ((crimeLng <=homeLngUpper) && (crimeLng >= homeLngLower))){
                //-   crimeScene = true;
                //-   break;
                //- }

                if ((crimeLat.toFixed(2) == homeLat.toFixed(2)) && (crimeLng.toFixed(2) == homeLng.toFixed(2))){
                  crimeScene = true;
                  break;
                } else {
                  crimeScene = false;
                  break;
                }
              if(crimeScene == true){
                carTheftCount += totalCrimes[i].attributes.AutoTheft_2019;
                console.log(carTheftCount)
              }
              }
              
                
            }
            console.log("CRIME COUNT FOR AUTO THEFT:", carTheftCount);
            crimeOutput.innerHTML = "<p>Car Theft Occurences 2019: <strong class='text-danger'>" + carTheftCount + "</strong> </p>";


            })
            .catch((error)=>{
              console.log(error)
               crimeOutput.innerHTML =`<h4 class="text-warning">Failed to fetch data. Please try again</h4>`
            })

      //- ===========================================Assault=============================================================== 


      //------------------ CODE FOR CRIME END -------------------------------------
      }


      //--------------------------------------------- CODE FOR BREEZOMETER AIR QUALITY------------------------------------------------------------------//
      function airQualityBreezo(){

        let airLat = document.getElementById('latResult').innerHTML;
        let airLng = document.getElementById('lngResult').innerHTML;
        let airQualityOutput2 =  document.getElementById('airQualityOutput2');
        airQualityOutput2.innerHTML = `<div class="spinner-border text-success"></div>`;
        let breezoKey = '453ca008418a45f889a118dcb9cac1da';

        axios({
            "method":"GET",
            "url":`https://api.breezometer.com/air-quality/v2/current-conditions?lat=${airLat}&lon=${airLng}&key=${breezoKey}&features=breezometer_aqi,local_aqi,health_recommendations,sources_and_effects,pollutants_concentrations,pollutants_aqi_information`,
            })
            .then((response)=>{
              console.log(response);
              let pollutant= response.data.data.pollutants; 
              let category;
              category = response.data.data.indexes.baqi.category;
              airQualityOutput2.innerHTML = `

              <div class="container-fluid">
                  <div class="row">
                    <div class="col-lg-9 col-md-6 col-sm-12 pt-3 card mb-3">
                        <h3 class="text-center lead">Air Quality</h4>
                        <h6 class="text-center">${category}</h6>
                        <hr>
                        <h3 class="text-center lead">Dominant pollutant</h4>
                        <h6 class="text-center">${response.data.data.indexes.baqi.dominant_pollutant}</h6>
                    </div>
                
                  <div class="col-lg-3 col-md-6 col-sm-12" style="z-index:1">
                        <h5>Recommendations</h5>
                        <div class="tooltip"><i class="fas fa-info-circle"></i> General Recommendation <span class="tooltiptext">${response.data.data.health_recommendations.general_population}</span></div>
                        <div class="tooltip"><i class="fas fa-info-circle"></i> For the elderly <span class="tooltiptext"> ${response.data.data.health_recommendations.elderly}</span></div>
                        <div class="tooltip"><i class="fas fa-info-circle"></i> For people with lung disease <span class="tooltiptext">${response.data.data.health_recommendations.lung_diseases}</span></div>
                        <div class="tooltip"><i class="fas fa-info-circle"></i> For people with heart disease <span class="tooltiptext">${response.data.data.health_recommendations.heart_diseases}</span></div>
                        <div class="tooltip"><i class="fas fa-info-circle"></i> For physically active people <span class="tooltiptext">${response.data.data.health_recommendations.active}</span></div>
                        <div class="tooltip"><i class="fas fa-info-circle"></i> For pregnant women  <span class="tooltiptext">${response.data.data.health_recommendations.pregnant_women}</span></div>
                        <div class="tooltip"><i class="fas fa-info-circle"></i> For children  <span class="tooltiptext">${response.data.data.health_recommendations.children}</span></div>
                  </div>  
                  </div>
              </div>

             

              <h4 class="mt-5 text-warning">POLLUTANTS</h4>

              <div class="container-fluid">
                  <div class="row">
                      <div class="col-lg-4 col-md-6 col-sm-12 col-xs-12">
                        <div class="card mb-3">
                          <div class="card-body">
                            <h6  class="lead">${pollutant.co.display_name}: ${pollutant.co.full_name}</h6>
                            <h6><small class="badge badge-pill badge-info">Score: ${pollutant.co.aqi_information.baqi.aqi}</small></h6>
                            <h6><small class="badge badge-pill badge-info">Result: ${pollutant.co.aqi_information.baqi.category}</small></h6>
                            <small><span class="text-danger">Sources and effects</span>:${pollutant.co.sources_and_effects.sources}. ${pollutant.co.sources_and_effects.effects} </small>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-4 col-md-6 col-sm-12 col-xs-12">
                        <div class="card mb-3">
                          <div class="card-body">
                            <h6  class="lead">${pollutant.no2.display_name}: ${pollutant.no2.full_name}</h6> 
                            <h6><small class="badge badge-pill badge-info">Score: ${pollutant.no2.aqi_information.baqi.aqi}</small></h6>
                            <h6><small class="badge badge-pill badge-info">Result: ${pollutant.no2.aqi_information.baqi.category}</small></h6>
                            <small><span class="text-danger">Sources and effects</span>:${pollutant.no2.sources_and_effects.sources}. ${pollutant.no2.sources_and_effects.effects}</small>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-4 col-md-6 col-sm-12 col-xs-12">
                        <div class="card mb-3">
                          <div class="card-body">
                            <h6 class="lead">${pollutant.o3.display_name}: ${pollutant.o3.full_name}</h6> 
                            <h6><small class="badge badge-pill badge-info">Score: ${pollutant.o3.aqi_information.baqi.aqi}</small></h6>
                            <h6><small class="badge badge-pill badge-info">Result: ${pollutant.o3.aqi_information.baqi.category}</small></h6>
                            <small><span class="text-danger">Sources and effects</span>:${pollutant.o3.sources_and_effects.sources}. ${pollutant.o3.sources_and_effects.effects}</small>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-4 col-md-6 col-sm-12 col-xs-12">
                        <div class="card mb-3">
                          <div class="card-body">
                            <h6  class="lead">${pollutant.pm10.display_name}: ${pollutant.pm10.full_name}</h6> 
                            <h6><small class="badge badge-pill badge-info">Score: ${pollutant.pm10.aqi_information.baqi.aqi}</small></h6>
                            <h6><small class="badge badge-pill badge-info">Result: ${pollutant.pm10.aqi_information.baqi.category}</small></h6>
                            <small><span class="text-danger">Sources and effects</span>:${pollutant.pm10.sources_and_effects.sources}. ${pollutant.pm10.sources_and_effects.effects}</small>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-4 col-md-6 col-sm-12 col-xs-12">
                        <div class="card mb-3">
                          <div class="card-body">
                            <h6 class="lead">${pollutant.pm25.display_name}: ${pollutant.pm25.full_name}</h6> 
                            <h6><small class="badge badge-pill badge-info">Score: ${pollutant.pm25.aqi_information.baqi.aqi}</small></h6>
                            <h6><small class="badge badge-pill badge-info">Result: ${pollutant.pm25.aqi_information.baqi.category}</small></h6>
                            <small><span class="text-danger">Sources and effects</span>:${pollutant.pm25.sources_and_effects.sources}. ${pollutant.pm25.sources_and_effects.effects}</small>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-4 col-md-6 col-sm-12 col-xs-12">
                        <div class="card mb-3">
                          <div class="card-body">
                            <h6 class="lead">${pollutant.so2.display_name}: ${pollutant.so2.full_name}</h6> 
                            <h6><small class="badge badge-pill badge-info">Score: ${pollutant.so2.aqi_information.baqi.aqi}</small></h6>
                            <h6><small class="badge badge-pill badge-info">Result: ${pollutant.so2.aqi_information.baqi.category}</small></h6>
                            <small><span class="text-danger">Sources and effects</span>:${pollutant.so2.sources_and_effects.sources}. ${pollutant.so2.sources_and_effects.effects}</small>
                          </div>
                        </div>
                      </div>
                  </div>
              </div>
              `
            })
            .catch((error)=>{
              console.log(error)
              airQualityOutput2.innerHTML = `<h5 class="text-danger">Air Quality not available for this area</h5>`

            })
                
      }





      //- CODE FOR BREEZOMETER AIR QUALITY//
          // endOdTopNav
          // Traversy Google Geocode API & JavaScript Tutorial - for getting lat-long
          // END OF MODAL
          // JQUERY CDN
    script(src='https://code.jquery.com/jquery-3.4.1.slim.min.js', integrity='sha256-pasqAKBDmFT4eHoN2ndd6lN370kFiGUFyTiUHWhU7k8=', crossorigin='anonymous')
