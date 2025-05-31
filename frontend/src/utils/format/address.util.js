export const formatAddress = (address) => {
    if (!address) return '';
    const { number, street, ward, district, province } = address;
    return `${number}, ${street}, ${ward}, ${district}, ${province}`;
};
