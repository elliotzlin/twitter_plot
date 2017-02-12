/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your dashboard ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 'ojs/ojchart', 'ojs/ojthematicmap'],
 function(oj, ko, $) {
    function DashboardViewModel() {
      var self = this;
      var countries = {"Canada": "CAN", "Egypt": "EGY", "France": "FRA", "Japan": "JPN", "United States": "USA"};
      var trend_data = [];
      $.getJSON("data/World.json",
          function(data) {
              console.log(data);
              trend_data = data;
              self.layers = [{layer: 'countries', areaDataLayer: {id: 'adl1', areas: getTrendsData}}];
          }
      );

      var getCountryID = function(country) {
          return countries[country];
      };

      var getTrendsData = function() {
          var areaData = [];
          console.log(trend_data);
          for (var i = 0; i < trend_data.length; i++) {
              var top = trend_data[i]["trends"][0]["name"];
              areaData.push(
                  { id: i.toString(),
                    color: '#42C0FB',
                    location: getCountryID(trend_data[i]["locations"][0]["name"]),
                    shortDesc: 'Top trending tweet - ' + top.toString()}
              );
          }
          return areaData;
      }

      self.layers = [{layer: 'countries', areaDataLayer: {id: 'adl1', areas: getTrendsData}}];
    }

    return new DashboardViewModel();
  }
);
