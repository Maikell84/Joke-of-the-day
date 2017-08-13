/* global describe, it, expect, app */

describe("settings.js tests... ", function () {
  // The 'it' function of Jasmine defined an individual test. The first argument is
  // a description of the test that's appended to the module name. Because a module name
  // is typically a noun, like the name of the function being tested, the description for
  // an individual test is typically written in an action-data format.

  it("escapes html characters", function () {
    expect(app.utils.escapeHtml("<")).toEqual("&lt;");
    expect(app.utils.escapeHtml(">")).toEqual("&gt;");
    expect(app.utils.escapeHtml("<script>")).toEqual("&lt;script&gt;");
    expect(app.utils.escapeHtml("piZZa")).toEqual("piZZa");
    expect(app.utils.escapeHtml("&")).toEqual("&amp;");
    expect(app.utils.escapeHtml('"')).toEqual("&quot;");
    expect(app.utils.escapeHtml("'")).toEqual("&#39;");
    expect(app.utils.escapeHtml("info@example.org")).toEqual("info@example.org");
    expect(app.utils.escapeHtml("=")).toEqual("&#x3D;");
    expect(app.utils.escapeHtml("`")).toEqual("&#x60;");

  });

});
