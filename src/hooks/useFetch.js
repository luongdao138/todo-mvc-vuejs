import { ref, isRef, watchEffect } from "vue";
import axios from "axios";

export function useFetch(url, params = {}) {
  const data = ref(null);
  const isLoading = ref(false);
  const status = ref("idle");
  const isSuccess = ref(false);
  const isError = ref(false);
  const error = ref(null);

  const handleFetch = () => {
    isLoading.value = true;
    status.value = "pending";
    axios
      .get(url, { params })
      .then((res) => {
        data.value = res.data;
        isSuccess.value = true;
        isError.value = false;
        error.value = null;
        status.value = "success";
      })
      .catch((error) => {
        data.value = null;
        error.value = error;
        isError.value = true;
        isSuccess.value = false;
        status.error = "error";
      })
      .finally(() => {
        isLoading.value = false;
      });
  };

  if (isRef(url)) {
    watchEffect(handleFetch);
  } else {
    handleFetch();
  }

  return {
    data,
    isError,
    isSuccess,
    isLoading,
    error,
    status,
  };
}
