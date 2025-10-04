
// Aviruk Basak
// 12:17 AM
{
    // js arrays
    const oldArr = [];

    function foo() {
        const newItem = 5;
        oldArr.push(newItem);
        return oldArr;
    }

    const newArr = foo();
    oldArr === newArr // -> true -> component is not update as no re-render
}
compare(oldArr,foo())
compare(oldArr,oldArr)

{
    // arrays in react state
    const oldArr = [];

    function foo() {
        const newItem = 5;
        const newArr = [...oldArr, newItem];
        return newArr;
    }

    const newArr = foo();
    oldArr === newArr // -> false -> re-render happens -> component is updated with newArr
}

compare(oldArr,foo())