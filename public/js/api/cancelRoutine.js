async function cancelRoutine(routineId) {
    await $.ajax({
        url: config.serverUrl + `api/routine/check?routineId=${routineId}`,
        method: "DELETE",
        headers: {
          authorization: "Bearer "+ getCookie("accessToken"),
        },
        success: (res) => {
          routineSubject.update();
        },
        error: (error) => {
          console.log("Error :", error);
        }
      });
}