export function error(message: string) {
    window.alert(message);
    throw (message);
}