function epochToDate() {
    const unixEpochTimeMS = data.time * 1000;
    const d = new Date(unixEpochTimeMS);
    // Careful, the string output here can vary by implementation...
    const strDate = d.toLocaleString();
    console.log("strDate", strDate);
    return strDate;
}

module.exports = { epochToDate }