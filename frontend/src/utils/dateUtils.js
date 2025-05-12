export const formatDate = (isoString, options = {}) => {
  if (!isoString) return '';
  
  try {
    const date = new Date(isoString);
    
    if (isNaN(date.getTime())) {
      return 'Fecha inválida';
    }
    
    const defaultOptions = {
      dateStyle: 'medium',
      timeStyle: 'short',
      ...options
    };
    
    return date.toLocaleString('es-ES', defaultOptions);
  } catch (error) {
    console.error('error al formatear la fecha:', error);
    return 'error en formato de fecha... ';
  }
};