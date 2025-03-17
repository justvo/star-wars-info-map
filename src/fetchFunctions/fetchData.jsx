import { mainFetch } from "./mainFetch";

export const fetchData = async (
  dispatch,
  items,
  itemId,
  itemType,
  itemKey,
  childItems,
  setChildItem,
  setItems,
  setItem,
  setIsPageLoaded,
) => {
  let currItem = items?.find((item) => item.id == itemId);

  if (!currItem) {
    currItem = await mainFetch(
      `https://swapi.dev/api/${itemType}/${itemId}`,
      dispatch,
      itemType == "people" ? "residents" : "films"
    );
  }


  if (currItem && !currItem[itemKey]) {
    const childUrl = [
      ...currItem[itemType == "people" ? "films" : "characters"],
    ];
    let childData = [];

    for (let url of childUrl) {
      const childId = url.split("/").pop();
      let childObj = childItems.find((obj) => obj.id == childId);

      if (childObj) {
        childData.push(childObj);
      } else {
        childObj = await mainFetch(
          url,
          dispatch,
          itemType == "people" ? "films" : "residents"
        );
        childData.push(childObj);
        dispatch(setChildItem([childObj]));
      }
    }

    currItem = {
      ...currItem,
      [itemKey]: childData,
    };

    dispatch(setItems([currItem]));

  }
  setItem(currItem);
  setIsPageLoaded(true);
  
};
