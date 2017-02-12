/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your dashboard ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 'ojs/ojchart', 'ojs/ojthematicmap', 'promise', 'ojs/ojlistview', 'ojs/ojtable'],
 function(oj, ko, $) {
    function DashboardViewModel() {
      var self = this;
      var countries = {"Canada": "CAN", "Egypt": "EGY", "France": "FRA", "Japan": "JPN", "United States": "USA"};
      var countryIDs = {"CAN": "Canada", "EGY": "Egypt", "FRA": "France", "JPN": "Japan", "USA": "United States"};

      var trend_data = [];
      var countryTrends = [];

      self.datasource = new oj.ArrayTableDataSource(countryTrends, {idAttribute: "name"});

      $.getJSON("data/World.json",
          function(data) {
              trend_data = data;
              self.areaData = getTrendsData();
              //self.layers = [{layer: 'countries', areaDataLayer: {id: 'adl1', areas: getTrendsData}}];
          }
      );

      var getCountryID = function(country) {
          return countries[country];
      };

      var getCountryName = function(countryID) {
          return countryIDs[countryID];
      };

      var getTrendsData = function() {
          var areaData = [];
          color_array = ["red", "green", "purple", "blue"];
          for (var i = 0; i < trend_data.length; i++) {
              var top = trend_data[i]["trends"][0]["name"];
              areaData.push(
                  { id: i.toString(),
                    color: color_array[i % 4],
                    location: getCountryID(trend_data[i]["locations"][0]["name"]),
                    shortDesc: 'Top trending tweet - ' + top.toString()}
              );
          }
          return areaData;
      }

      self.mapOptionChange = function(event, ui) {
          if (ui['option'] == 'selection') {
              if (ui['value']['adl1']) {
                  var areas = self.areaData;
                  for (var i = 0; i < areas.length; i++){
                      // Find matching area info from data model and grab info
                      if (areas[i]['id'] == ui['value']['adl1'][0]) {
                          var countryName = getCountryName(areas[i]['location']);
                          // Find matching data in JSON
                          for (var j = 0; j < trend_data.length; j++) {
                              if (trend_data[j]['locations'][0]['name'] == countryName) {
                                  countryTrends = trend_data[j]['trends'];
                                  self.datasource.reset(countryTrends, {idAttribute: "name"});
                                  break;
                              }
                          }
                      }
                  }
              }
          }
      }

      self.layers = [{layer: 'countries', areaDataLayer: {id: 'adl1', selectionMode: 'single', areas: getTrendsData}}];
    }

    $(document).ready
    (
        function()
        {
            ko.applyBindings(new DashboardViewModel(), document.getElementById('table'));
        }
    );

    return new DashboardViewModel();
  }
);
