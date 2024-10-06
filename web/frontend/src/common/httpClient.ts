// httpClient.ts
import axios from "axios";
import { applicationConfig } from "./environment.ts";

let activeRequests = 0;
// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: applicationConfig.backendUrl, // Replace with your API base URL
  headers: {
    "Content-Type": "application/json"
  }
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    activeRequests++;
    let loading = document.getElementById("loadingDiv");
    if (loading) {
      loading.hidden = false;
    }
    // loadingService.setLoading(true); // Notify loading state
    return config;
  },
  (error) => {
    activeRequests--;
    if (activeRequests === 0) {
      let loading = document.getElementById("loadingDiv");
      if (loading) {
        loading.hidden = true;
      }
      // loadingService.setLoading(false);
    }
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    activeRequests--;
    if (activeRequests === 0) {
      let loading = document.getElementById("loadingDiv");
      if (loading) {
        loading.hidden = true;
      }

      // loadingService.setLoading(false); // Notify loading state
    }
    return response;
  },
  (error) => {
    if (error.response) {
      activeRequests--;
      if (activeRequests === 0) {
        //loadingService.setLoading(false);
      }
      const { status, data } = error.response;
      if (status === 401 || status === 403) {
        window.location.href = "/login"; // Redirect on unauthorized access
      } else {
        // Display an alert for other errors
        alert(`Error ${status}: ${data.message || error.message}`);
      }
    } else {
      // Handle network or unexpected errors
      alert(`Network Error: ${error.message}`);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
