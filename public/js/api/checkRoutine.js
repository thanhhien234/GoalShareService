async function checkRoutine(routineId) {
    await $.ajax({
        url: config.serverUrl + `api/routine/check?routineId=${routineId}`,
        method: "POST",
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