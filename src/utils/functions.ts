export function formatDate(dateStr: string): string {
  if (!dateStr) return '';

  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const [year, month, day] = dateStr.split('-');

  return `${parseInt(day)} ${months[parseInt(month) - 1]} ${year}`;
}

export function createdAtDate(): string {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
}

export function formatEmail(email: string): string {
  if (!email) return '';

  const [username, currentDomain] = email.split('@');
  const asterisks = '\\*'.repeat(currentDomain.split('.')[0].length);
  const newDomain =
    asterisks + '.' + currentDomain.split('.').slice(1).join('.');

  return `${username}@${newDomain}`;
}

export function getViewsColor(views: number): string {
  if (views >= 0 && views <= 25) {
    return 'tomato';
  } else if (views >= 26 && views <= 50) {
    return 'orange';
  } else if (views >= 51 && views <= 75) {
    return 'yellow';
  } else if (views >= 76 && views <= 100) {
    return 'green';
  } else {
    return 'black';
  }
}

export function isLoggedIn() {
  return Boolean(localStorage.getItem('token'));
}

export function generateToken() {
  const timestamp = Date.now().toString();
  const random = Math.random().toString(36).substring(2, 10);
  return timestamp + random;
}

export function validateEmail(email: string | undefined) {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}
