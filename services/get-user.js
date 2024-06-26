module.exports = (config, req) => {
  try {
    if ( config.appConfig.auth.enableHeaderAuth ) {
      const userHeader = config.appConfig.auth.headerAuth.userHeader;
      const proxyWhitelist = config.appConfig.auth.headerAuth.proxyWhitelist;
      if ( proxyWhitelist.includes(req.socket.remoteAddress) ) {
        return { "success": true, "user": req.headers[userHeader.toLowerCase()] };
      }
    }
    return {};
  } catch (e) {
    console.warn("Error get-user: ", e);
    return { 'success': false };
  }
};