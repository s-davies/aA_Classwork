
const partyHeader = document.getElementById('party');

export const htmlGenerator = (string, htmlElement) => {
    const pEl = document.createElement('p');
    pEl.innerHTML = string;
    htmlElement.append(pEl);
};

export default htmlGenerator;

htmlGenerator('Party Time.', partyHeader);