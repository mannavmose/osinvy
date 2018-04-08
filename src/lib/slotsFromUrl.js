// '01010101010101010101010101010101010101010101010101010101'

const tempDb = {
  '01': 'shark',
  '02': 'lobster',
  '03': 'monkfish',
  '04': 'firecape',
};

const SLOT_LEN = 2;
const CIPHER_SEQ = [8, 5, 3, -4, -7, 7, 12, -1, 13, 2, 11, 29, -2, 10, -3, -3, -3, 8, 2, -9, 6, 9, 6, 9, 69, 4, 2, -6, 8, 5, 3, -4, -7, 7, 12, -1, 13, 2, 11, 29, -2, 10, -3, -3, -3, 8, 2, -9, 6, 9, 6, 9, 69, 4, 2, -6];

// doesn't work cuz charCode for something like '9' might become 2 digits long
function obscure(str) {
  return [...new Array(str.length)].map((_, i) => str.charCodeAt(i) + CIPHER_SEQ[i]).join();
}

function reveal(str) {
  return [...new Array(str.length)].map((_, i) => str.charCodeAt(i) - CIPHER_SEQ[i]).join();
}

function getUrlParams(prop) {
  const params = {};
  const search = decodeURIComponent(window.location.href.slice(window.location.href.indexOf('?') + 1));
  const definitions = search.split('&');

  definitions.forEach((val, key) => {
    const parts = val.split('=', 2);
    params[parts[0]] = parts[1];
  });
  return (prop && prop in params) ? params[prop] : params;
}

function chunkStr(str, size) {
  const numChunks = Math.ceil(str.length / size);
  const chunks = [...new Array(numChunks)];
  return chunks.map((_, i) => str.substr(i * size, size));
}


function lookupSlotsFromUrlCode(code) {
  const arr = chunkStr(code, SLOT_LEN);
  return arr.map((lookup, index) => (
    {
      position: index + 1,
      contents: tempDb[lookup] || 'missing',
    }
  ));
}

export default function () {
  const code = getUrlParams('code');
  return lookupSlotsFromUrlCode(code);
}
