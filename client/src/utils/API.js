import axios from "axios";

export default {
  // Gets all posts
  getData: function(query) {
    // console.log(query.country)
    return axios.get("/api/pf", {params: {address: query.address, country: query.country}});
  },
  // postQuery: function(query) {
  //   return axios.post("/api/pf", {address: query.address, country: query.country});
  // },
};
