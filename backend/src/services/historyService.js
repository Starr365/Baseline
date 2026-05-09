const scans = [];

const historyService = {
  saveScan: (scan) => {
    scans.push(scan);
    return scan;
  },
  getHistoryByWallet: (walletAddress) => {
    return scans
      .filter(s => s.walletAddress === walletAddress)
      .sort((a, b) => b.timestamp - a.timestamp);
  }
};

module.exports = historyService;
