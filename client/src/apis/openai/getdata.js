//  Contain the function we'll run for our assistant.
import API from "../../utils/API";

async function getData(params) {
  const country = params.country;
  const address = params.address;

  try {
    API.getPF({ address, country }).then((res) => {
        return JSON.stringify(res.data);
        // console.log(res.data.data.getDatasetStatistics.datasetStatisticsResponses);
      })  
  } catch (error) {
    console.error(error);
    return null;
  }
}

module.exports = getData;