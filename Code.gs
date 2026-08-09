const CONFIG = {
  MAX_MESSAGES_PER_SHEET: 6,
  MAX_NAME: 80,
  MAX_MESSAGE: 2000,
  PROPERTY_KEY: 'SITE_MESSAGES_V1'
};

function doGet(e) {
  const params = e && e.parameter ? e.parameter : {};
  const action = params.action || 'messages';

  if (action === 'save') {
    const result = saveMessage_(params.name, params.message);
    return jsonp_(result, params.callback);
  }

  if (action === 'messages') {
    return jsonp_({ success: true, messages: readMessages_() }, params.callback);
  }

  return jsonp_({ success: true, message: 'Site API online.' }, params.callback);
}

function doPost(e) {
  try {
    const body = e && e.postData && e.postData.contents ? JSON.parse(e.postData.contents) : {};
    const result = saveMessage_(body.name, body.message);
    return jsonp_(result, body.callback);
  } catch (err) {
    return jsonp_({ success: false, error: String(err) }, null);
  }
}

function saveMessage_(name, message) {
  name = String(name || '').trim();
  message = String(message || '').trim();

  if (!name) return { success: false, error: 'Nome obrigatório.' };
  if (!message) return { success: false, error: 'Mensagem obrigatória.' };
  if (name.length > CONFIG.MAX_NAME) return { success: false, error: 'Nome muito longo.' };
  if (message.length > CONFIG.MAX_MESSAGE) return { success: false, error: 'Mensagem muito longa.' };

  const lock = LockService.getScriptLock();
  lock.waitLock(10000);

  try {
    const messages = readMessages_();
    messages.push({
      id: Utilities.getUuid(),
      name: name,
      message: message,
      timestamp: new Date().toISOString()
    });

    PropertiesService.getScriptProperties().setProperty(
      CONFIG.PROPERTY_KEY,
      JSON.stringify(messages)
    );

    return { success: true, message: 'Mensagem guardada.', saved: messages[messages.length - 1] };
  } finally {
    lock.releaseLock();
  }
}

function readMessages_() {
  const raw = PropertiesService.getScriptProperties().getProperty(CONFIG.PROPERTY_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    return [];
  }
}

function jsonp_(data, callback) {
  const safeCallback = callback && /^[A-Za-z_$][0-9A-Za-z_$]*$/.test(callback) ? callback : null;
  const payload = JSON.stringify(data).replace(/</g, '\\u003c');

  if (safeCallback) {
    return ContentService
      .createTextOutput(safeCallback + '(' + payload + ')')
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }

  return ContentService
    .createTextOutput(payload)
    .setMimeType(ContentService.MimeType.JSON);
}
