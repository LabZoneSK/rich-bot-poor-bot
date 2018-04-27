/**
 * Handles input changes in forms. Updates inner state of component.
 * 
 * @param {Object} event change event 
 * @param {React.Component} self Component in which form is used
 */
export function handleInputChangesGeneric(event, self) {
  const target = event.target;
  const value = target.type === 'checkbox' ? target.checked : target.value;
  const name = target.name;

  self.setState({
    [name]: value
  });
}