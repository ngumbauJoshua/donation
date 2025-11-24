

const isValidHtml = (html: string, doctype: DOMParserSupportedType = "application/xml"): boolean => {
  // Check if element is starting with xml in order to parse it as such if mime type is xml
  if ((doctype === 'application/xml' || doctype === 'application/xhtml+xml') && !html.startsWith("<?xml")) {
    return false;
  }

  const parser = new DOMParser();
  const doc = parser.parseFromString(html, doctype);
  const errorNode = doc.querySelector('parsererror');

  return !errorNode;
}

export default isValidHtml;
