export default (arr) => {
    let index = -1;
    const curr = () => {
        if (index < arr.length)
            return { value: arr[index], done: false };
        return { value: arr[index], done: true };
    };
    const peak = (sight = 1) => {
        if (index + sight < arr.length)
            return { value: arr[index + sight], done: false };
        return { value: arr[index], done: true };
    };
    const next = () => {
        if (index < arr.length)
            return { value: arr[++index], done: false };
        return { value: arr[index], done: true };
    };
    const next_by_step = (step) => {
        if (index < arr.length) {
            index += step;
            return { value: arr[index], done: false };
        }
        return { value: arr[index], done: true };
    };
    const peakBack = (sight = 1) => {
        if (index + sight < arr.length)
            return { value: arr[index - sight], done: false };
        return { value: arr[index], done: true };
    };
    const back = () => {
        if (index > 0 && index < arr.length)
            return { value: arr[--index], done: false };
        return { value: arr[index], done: true };
    };
    const back_by_steps = (step) => {
        if (index > 0 && index < arr.length) {
            index -= step;
            return { value: arr[index], done: false };
        }
        return { value: arr[index], done: true };
    };
    const remove = () => {
        if (index < arr.length) {
            let item = arr.splice(index, 1);
            index -= 1;
            return { value: item, done: false };
        }
        return { value: arr[index], done: true };
    };
    const remove_by_value = (value) => {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === value) {
                let item = arr.splice(i, 1);
                if (i < index)
                    index -= 1;
                return { value: item, done: false };
            }
        }
    };
    return {
        curr,
        peak,
        next,
        next_by_step,
        peakBack,
        back,
        back_by_steps,
        remove,
        remove_by_value
    };
};
