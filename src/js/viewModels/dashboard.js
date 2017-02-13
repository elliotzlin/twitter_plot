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
      var countries = {"Afghanistan":"AFG", "Albania":"ALB", "Algeria":"DZA", "American Samoa":"ASM", "Andorra":"AND", "Angola":"AGO", "Anguilla":"AIA", "Antigua And Barbuda":"ATG", "Argentina":"ARG", "Armenia":"ARM", "Aruba":"ABW",  "Australia":"AUS", "Austria":"AUT", "Azerbaijan":"AZE", "Bahamas":"BHS", "Bahrain":"BHR", "Bangladesh":"BGD", "Barbados":"BRB", "Belarus":"BLR", "Belgium":"BEL", "Belize":"BLZ", "Benin":"BEN", "Bermuda":"BMU", "Bhutan":"BTN", "Bolivia":"BOL", "Bosnia And Herzegovina": "BIH", "Botswana": "BWA", "Brazil": "BRA", "Brunei Darussalam":"BRN", "Bulgari a":"BGR", "Burkina Faso":"BFA", "Burundi":"BDI", "Cambodia":"KHM", "Cameroon":"CMR", "Canada":"CAN", "Cape Verde":"CPV", "Cayman Islands":"CYM", "Central African Republic":"CAF", "Chad":"TCD", "Chile":"CHL", "China":"CHN", "Colombia":"COL", "Comoros":"COM", "Congo":"COG", "Congo, Democratic Republic Of The":"COD", "Cook Islands":"COK", "Costa Rica":"CRI", "Cote D'Ivoire":"CIV", "Croatia":"HRV", "Cuba":"CUB", "Cyprus":"CYP", "Czech Republic":"CZE", "Denmark":"DNK", "Djibouti":"DJI", "Dominica":"DMA", "Dominican Republic":"DOM", "Ecuador":"ECU", "Egypt":"EGY", "El Salvador":"SLV", "Equatorial Guinea":"GNQ", "Eritrea":"ERI", "Estonia":"EST", "Ethiopia":"ETH", "Falkland Islands":"FLK", "Faroe Islands":"FRO", "Fiji":"FJI", "Finland":"FIN", "France":"FRA", "French Guiana":"GUF", "French Polynesia":"PYF", "Gabon":"GAB", "Gambia":"GMB", "Gaza Strip":"GAZ", "Georgia":"GEO", "Germany":"DEU", "Ghana":"GHA", "Gibraltar":"GIB", "Golan Heights":"GOL", "Greece":"GRC", "Greenland":"GRL", "Grenada":"GRD", "Guadeloupe":"GLP", "Guam":"GUM", "Guatemala":"GTM", "Guinea":"GIN", "Guinea-Bissau":"GNB", "Guyana":"GUY", "Haiti":"HTI", "Honduras":"HND", "Hong Kong":"HKG", "Hungary":"HUN", "Iceland":"ISL", "India":"IND", "Indonesia":"IDN", "Iran":"IRN", "Iraq":"IRQ", "Ireland":"IRL", "Israel":"ISR", "Italy":"ITA", "Jamaica":"JAM", "Japan":"JPN", "Jordan":"JOR", "Kazakhstan":"KAZ", "Kenya":"KEN", "Kiribati":"KIR", "Korea":"KOR", "Korea, Democratic People'S Republic Of":"PRK", "Kuwait":"KWT", "Kyrgyzstan":"KGZ", "Laos":"LAO", "Latvia":"LVA", "Lebanon":"LBN", "Lesotho":"LSO", "Liberia":"LBR", "Libya":"LBY", "Liechtenstein":"LIE", "Lithuania":"LTU", "Luxembourg":"LUX", "Macau":"MAC", "Macedonia":"MKD", "Madagascar":"MDG", "Malawi":"MWI", "Malaysia":"MYS", "Maldives":"MDV", "Mali":"MLI", "Malta":"MLT", "Marshall Islands":"MHL", "Martinique":"MTQ", "Mauritania":"MRT", "Mauritius":"MUS", "Mayotte":"MYT", "Mexico":"MEX", "Micronesia":"FSM", "Moldova":"MDA", "Monaco":"MCO", "Mongolia":"MNG", "Montenegro":"MNE", "Montserrat":"MSR", "Morocco":"MAR", "Mozambique":"MOZ", "Myanmar":"MMR", "Namibia":"NAM", "Nauru":"NRU", "Nepal":"NPL", "Netherlands":"NLD", "Netherlands Antilles":"ANT", "New Caledonia":"NCL", "New Zealand":"NZL", "Nicaragua":"NIC", "Niger":"NER", "Nigeria":"NGA", "Niue":"NIU", "Norfolk Island":"NFK", "Northern Mariana Islands":"MNP", "Norway":"NOR", "Oman":"OMN", "Pakistan":"PAK", "Palau":"PLW", "Panama":"PAN", "Papua New Guinea":"PNG", "Paraguay":"PRY", "Peru":"PER", "Philippines":"PHL", "Poland":"POL", "Portugal":"PRT", "Puerto Rico":"PRI", "Qatar":"QAT", "Reunion":"REU", "Romania":"ROU", "Russia":"RUS", "Rwanda":"RWA", "Saint Helena":"SHN", "Saint Kitts And Nevis":"KNA", "Saint Lucia":"LCA", "Saint Pierre And Miquelon":"SPM", "Saint Vincent And The Grenadines":"VCT", "Samoa":"WSM", "San Marino":"SMR", "Sao Tome And Principe":"STP", "Saudi Arabia":"SAU", "Senegal":"SEN", "Serbia":"SCG", "Seychelles":"SYC", "Sierra Leone":"SLE", "Singapore":"SGP", "Slovakia":"SVK", "Slovenia":"SVN", "Solomon Islands":"SLB", "Somalia":"SOM", "South Africa":"ZAF", "Spain":"ESP", "Sri Lanka":"LKA", "Sudan":"SDN", "Suriname":"SUR", "Svalbard And Jan Mayen":"SJM", "Swaziland":"SWZ", "Sweden":"SWE", "Switzerland":"CHE", "Syria":"SYR", "Taiwan":"TWN", "Tajikistan":"TJK", "Tanzania":"TZA", "Thailand":"THA", "Timor-Leste":"TLS", "Togo":"TGO", "Tokelau":"TKL", "Tonga":"TON", "Trinidad And Tobago":"TTO", "Tunisia":"TUN", "Turkey":"TUR", "Turkmenistan":"TKM", "Turks And Caicos Islands":"TCA", "Tuvalu":"TUV", "UN Neutral Zone":"UNN", "Uganda":"UGA", "Ukraine":"UKR", "United Arab Emirates":"ARE", "United Kingdom":"GBR", "United States":"USA", "Uruguay":"URY", "Uzbekistan":"UZB", "Vanuatu":"VUT", "Venezuela":"VEN", "Viet Nam":"VNM", "Virgin Islands, British":"VGB", "Virgin Islands, U.S":"VIR", "Wallis And Futuna":"WLF", "West Bank":"WES", "Western Sahara":"ESH", "Yemen":"YEM", "Zambia":"ZMB", "Zimbabwe":"ZWE"};

      var countryIDs = {"AFG":"Afghanistan", "ALB":"Albania", "DZA":"Algeria", "ASM":"American Samoa", "AND":"Andorra", "AGO":"Angola", "AIA":"Anguilla", "ATG":"Antigua And Barbuda", "ARG":"Argentina", "ARM":"Armenia", "ABW":"Aruba", "AUS":"Australia", "AUT":"Austria", "AZE":"Azerbaijan", "BHS":"Bahamas", "BHR":"Bahrain", "BGD":"Bangladesh", "BRB":"Barbados", "BLR":"Belarus", "BEL":"Belgium", "BLZ":"Belize", "BEN":"Benin", "BMU":"Bermuda", "BTN":"Bhutan", "BOL":"Bolivia", "BIH":"Bosnia And Herzegovina", "BWA":"Botswana", "BRA":"Brazil", "BRN":"Brunei Darussalam", "BGR":"Bulgaria", "BFA":"Burkina Faso", "BDI":"Burundi", "KHM":"Cambodia", "CMR":"Cameroon", "CAN":"Canada", "CPV":"Cape Verde", "CYM":"Cayman Islands", "CAF":"Central African Republic", "TCD":"Chad", "CHL":"Chile", "CHN":"China", "COL":"Colombia", "COM":"Comoros", "COG":"Congo", "COD":"Congo, Democratic Republic Of The", "COK":"Cook Islands", "CRI":"Costa Rica", "CIV":"Cote D'Ivoire", "HRV":"Croatia", "CUB":"Cuba", "CYP":"Cyprus", "CZE":"Czech Republic", "DNK":"Denmark", "DJI":"Djibouti", "DMA":"Dominica", "DOM":"Dominican Republic", "ECU":"Ecuador", "EGY":"Egypt", "SLV":"El Salvador", "GNQ":"Equatorial Guinea", "ERI":"Eritrea", "EST":"Estonia", "ETH":"Ethiopia", "FLK":"Falkland Islands", "FRO":"Faroe Islands", "FJI":"Fiji", "FIN":"Finland", "FRA":"France", "GUF":"French Guiana", "PYF":"French Polynesia", "GAB":"Gabon", "GMB":"Gambia", "GAZ":"Gaza Strip", "GEO":"Georgia", "DEU":"Germany", "GHA":"Ghana", "GIB":"Gibraltar", "GOL":"Golan Heights", "GRC":"Greece", "GRL":"Greenland", "GRD":"Grenada", "GLP":"Guadeloupe", "GUM":"Guam", "GTM":"Guatemala", "GIN":"Guinea", "GNB":"Guinea-Bissau", "GUY":"Guyana", "HTI":"Haiti", "HND":"Honduras", "HKG":"Hong Kong", "HUN":"Hungary", "ISL":"Iceland", "IND":"India", "IDN":"Indonesia", "IRN":"Iran", "IRQ":"Iraq", "IRL":"Ireland", "ISR":"Israel", "ITA":"Italy", "JAM":"Jamaica", "JPN":"Japan", "JOR":"Jordan", "KAZ":"Kazakhstan", "KEN":"Kenya", "KIR":"Kiribati", "KOR":"Korea", "PRK":"Korea, Democratic People'S Republic Of", "KWT":"Kuwait", "KGZ":"Kyrgyzstan", "LAO":"Laos", "LVA":"Latvia", "LBN":"Lebanon", "LSO":"Lesotho", "LBR":"Liberia", "LBY":"Libya", "LIE":"Liechtenstein", "LTU":"Lithuania", "LUX":"Luxembourg", "MAC":"Macau", "MKD":"Macedonia", "MDG":"Madagascar", "MWI":"Malawi", "MYS":"Malaysia", "MDV":"Maldives", "MLI":"Mali", "MLT":"Malta", "MHL":"Marshall Islands", "MTQ":"Martinique", "MRT":"Mauritania", "MUS":"Mauritius", "MYT":"Mayotte", "MEX":"Mexico", "FSM":"Micronesia", "MDA":"Moldova", "MCO":"Monaco", "MNG":"Mongolia", "MNE":"Montenegro", "MSR":"Montserrat", "MAR":"Morocco", "MOZ":"Mozambique", "MMR":"Myanmar", "NAM":"Namibia", "NRU":"Nauru", "NPL":"Nepal", "NLD":"Netherlands", "ANT":"Netherlands Antilles", "NCL":"New Caledonia", "NZL":"New Zealand", "NIC":"Nicaragua", "NER":"Niger", "NGA":"Nigeria", "NIU":"Niue", "NFK":"Norfolk Island", "MNP":"Northern Mariana Islands", "NOR":"Norway", "OMN":"Oman", "PAK":"Pakistan", "PLW":"Palau", "PAN":"Panama", "PNG":"Papua New Guinea", "PRY":"Paraguay", "PER":"Peru", "PHL":"Philippines", "POL":"Poland", "PRT":"Portugal", "PRI":"Puerto Rico", "QAT":"Qatar", "REU":"Reunion", "ROU":"Romania", "RUS":"Russia", "RWA":"Rwanda", "SHN":"Saint Helena", "KNA":"Saint Kitts And Nevis", "LCA":"Saint Lucia", "SPM":"Saint Pierre And Miquelon", "VCT":"Saint Vincent And The Grenadines", "WSM":"Samoa", "SMR":"San Marino", "STP":"Sao Tome And Principe", "SAU":"Saudi Arabia", "SEN":"Senegal", "SCG":"Serbia", "SYC":"Seychelles", "SLE":"Sierra Leone", "SGP":"Singapore", "SVK":"Slovakia", "SVN":"Slovenia", "SLB":"Solomon Islands", "SOM":"Somalia", "ZAF":"South Africa", "ESP":"Spain", "LKA":"Sri Lanka", "SDN":"Sudan", "SUR":"Suriname", "SJM":"Svalbard And Jan Mayen", "SWZ":"Swaziland", "SWE":"Sweden", "CHE":"Switzerland", "SYR":"Syria", "TWN":"Taiwan", "TJK":"Tajikistan", "TZA":"Tanzania", "THA":"Thailand", "TLS":"Timor-Leste", "TGO":"Togo", "TKL":"Tokelau", "TON":"Tonga", "TTO":"Trinidad And Tobago", "TUN":"Tunisia", "TUR":"Turkey", "TKM":"Turkmenistan", "TCA":"Turks And Caicos Islands", "TUV":"Tuvalu", "UNN":"UN Neutral Zone", "UGA":"Uganda", "UKR":"Ukraine", "ARE":"United Arab Emirates", "GBR":"United Kingdom", "USA":"United States", "URY":"Uruguay", "UZB":"Uzbekistan", "VUT":"Vanuatu", "VEN":"Venezuela", "VNM":"Viet Nam", "VGB":"Virgin Islands, British", "VIR":"Virgin Islands, U.S", "WLF":"Wallis And Futuna", "WES":"West Bank", "ESH":"Western Sahara", "YEM":"Yemen", "ZMB":"Zambia", "ZWE":"Zimbabwe"};

      var trend_data = [];
      var countryTrends = [];

      self.datasource = new oj.ArrayTableDataSource(countryTrends, {idAttribute: "name"});

      $.getJSON("data/Monde.json",
          function(data) {
              trend_data = data;
              self.areaData = getTrendsData();
              self.layers = [{layer: 'countries', areaDataLayer: {id: 'adl1', areas: getTrendsData}}];
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
          //color_array = ['#FF0000', '#80FF00', '#FF00FF', '#00FFFF', '#330000', '#FFFF00', '#FFCCCC'];
          color_array = ['red', 'green', 'blue', 'yellow', 'orange'];
          for (var i = 0; i < trend_data.length; i++) {
              var top = trend_data[i]["trends"][0]["name"];
              areaData.push(
                  { id: i.toString(),
                    color: color_array[i % 5],
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
