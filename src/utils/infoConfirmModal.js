/**
 *
 * @param {'remove' | 'leave'} type
 * @param {function} handleConfirm
 */
function infoConfirmModal(type, handleConfirm) {
  let text, subject;
  switch (type) {
    case 'remove':
      subject = 'Remove user ?';
      text = 'Are you sure you want to remove this person from the group?';
      break;
    case 'leave':
      subject = 'Leave group ?';
      text = 'Are you sure you want to leave this group?';
      break;
    default:
      subject = '';
      text = '';
      break;
  }

  return {
    text,
    subject,
    handleConfirm,
  };
}

export default infoConfirmModal;
