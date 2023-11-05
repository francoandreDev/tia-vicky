export const sum = (...args) => {
    return args.reduce((total, n) => (total += n));
};
