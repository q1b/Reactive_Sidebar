import iterator from "./iter";

export interface Header {
	depth: number;
	slug: string;
	text: string;
	pid?: string;
    uid?:string;
	children?: Header[];
}

const uid = () => (performance.now().toString(36) + Math.random().toString(36)).replace(/\./g, "");

export const arrange = (arr, log = false) => {
    const iterate = iterator(arr);
    let itrCount = 0;
    while (!iterate.peak().done) {
        iterate.peak().value.uid = uid();
        itrCount++;
        iterate.next();
    }
    iterate.back_by_steps(itrCount);
    while (!iterate.peak().done) {
        if (iterate.curr().value?.depth < iterate.peak().value?.depth) {
            let pid = iterate.curr().value?.uid;
            let wrt = iterate.peak();
            wrt.value.pid = pid;
            while (!iterate.peak().done && wrt.value?.depth === iterate.peak(2).value?.depth) {
                iterate.peak(2).value.pid = pid;
                iterate.next();
            }
        }
        else {
            let wrt = iterate.peak();
            let itrCount = 0;
            while (wrt.value?.depth <= iterate.peakBack().value?.depth) {
                itrCount++;
                iterate.back();
            }
            let pid = iterate.peakBack().value?.uid; // pid is available
            iterate.next_by_step(itrCount);
            wrt.value.pid = pid;
        }
        iterate.next();
    }
    iterate.back_by_steps(itrCount);
    while (!iterate.peak().done) {
        iterate.next();
    }
    return arr;
}

export function toTree(arr:Header[]) {
  let arrMap = new Map(arr.map(item => [item.uid, item]));
  let tree = [];
  for (let i = 0; i < arr.length; i++) {
    let item = arr[i];
    if (item.pid) {
      let parentItem = arrMap.get(item.pid);
      if (parentItem) {
        // let { children } = parentItem;
        if (parentItem.children) {
          parentItem.children.push(item);
        } else {
          parentItem.children = [item];
        }
      }
    } else 
      tree.push(item);
  }
  return tree;
}
