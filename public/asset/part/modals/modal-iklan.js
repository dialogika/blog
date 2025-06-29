  document.addEventListener("DOMContentLoaded", function () {
    const adModal = new bootstrap.Modal(document.getElementById("adModal"));
    const adStateKey = "hasSeenAd";
    const adTimestampKey = "adSeenTimestamp";
    const now = new Date().getTime();
    const seenTimestamp = localStorage.getItem(adTimestampKey);

    if (!seenTimestamp || now - seenTimestamp > 10 * 60 * 1000) {
      adModal.show();
      // 10 minutes
      localStorage.setItem(adStateKey, "true");
      localStorage.setItem(adTimestampKey, now);
    }
  });
