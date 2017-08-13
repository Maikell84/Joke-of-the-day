/* global app */
app.utils = {
  entity_map: {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    '/': '&#x2F;',
    '`': '&#x60;',
    '=': '&#x3D;'
  },
  escapeHtml: function(string){
    return String(string).replace(/[&<>"'`=/]/g, function (s) {
      return app.utils.entity_map[s];
    });
  }
};
