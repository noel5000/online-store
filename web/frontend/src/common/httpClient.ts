// httpClient.ts
import axios from "axios";
import { applicationConfig } from "./environment.ts";
import { MessagesService } from "./messages.ts";

let activeRequests = 0;
const messages = new MessagesService();
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
        let loading = document.getElementById("loadingDiv");
      if (loading) {
        loading.hidden = true;
      }
      }
      const { status, data } = error.response;
      if (status === 401 || status === 403) {
        window.location.href = "/login"; // Redirect on unauthorized access
        let loading = document.getElementById("loadingDiv");
        if (loading) {
          loading.hidden = true;
        }
      } else {
        // Display an alert for other errors
        let loading = document.getElementById("loadingDiv");
        if (loading) {
          loading.hidden = true;
        }
        messages.sendErrorMessage(`Error ${status}: ${data.message || error.message}`);
      }
    } else {
      // Handle network or unexpected errors
      let loading = document.getElementById("loadingDiv");
      if (loading) {
        loading.hidden = true;
      }
      messages.sendErrorMessage(`Network Error: ${error.message}`);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
