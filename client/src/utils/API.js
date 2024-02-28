import axios from "axios";

export default {
  // Gets all posts
  // readFile: function(query) {
  //   return axios.get("/api/read", {params: query});
  // },
  // writeFile: function(query) {
  //   return axios.get("/api/write", {params: query});
  // },
  getPF: function(query) {
    // console.log(query.country)
    return axios.get("/api/pf", {params: {address: query.address, country: query.country, warming_scenario: query.warming_scenario}});
  },
  // postQuery: function(query) {
  //   return axios.post("/api/pf", {address: query.address, country: query.country});
  // },

};
