// Import web vitals functions
import { onCLS, onFID, onFCP, onLCP, onTTFB } from 'web-vitals';

// Define reportWebVitals function
const reportWebVitals = (onPerfEntry) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    onCLS(onPerfEntry);
    onFID(onPerfEntry);
    onFCP(onPerfEntry);
    onLCP(onPerfEntry);
    onTTFB(onPerfEntry);
  }
};

// Export reportWebVitals function
export default reportWebVitals;
