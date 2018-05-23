import accounting from 'accounting';

/**
 * Function parse string to float. It accepts both formats - with comma
 * or with dot to separate decimals.
 * 
 * @param {string} source 
 */
export function parsePrice(source) {
  let float = accounting.unformat(source);
  let posComma = source.indexOf(',');
  if (posComma > -1) {
      let posDot = source.indexOf('.');
      if (posDot > -1 && posComma < posDot) {
          let germanFloat = accounting.unformat(source, ',');
          if (Math.abs(germanFloat) > Math.abs(float)) {
              float = germanFloat;
          }
      } else {
          // source = source.replace(/,/g, '.');
          float = accounting.unformat(source, ',');
      }
  }
  return float;
}