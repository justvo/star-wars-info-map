import { ref, listAll, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";
import { setPlanets } from "../services/reducers/planetsSlice";

const imageCache = {};

const formatName = (name) => {
  let formattedName = name.replace(/ /g, "");
  formattedName = formattedName.replace(/é/g, "e");

  formattedName = formattedName.replace(/\IV/g, "IV");

  return formattedName;
};

export const mainFetch = async (url, dispatch, type) => {
  const path = url.split("/");
  const id = path[path.length - 1];
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    let data = await response.json();
    if (data) {
      const imagesListRef = ref(storage, `${type}/`);
      const imageList = await listAll(imagesListRef);

      const imageUrls = await Promise.all(
        imageList.items.map((item) => {
          const imageName = item.name;
          if (imageCache[imageName]) {
            return imageCache[imageName];
          } else {
            return getDownloadURL(item).then((url) => {
              imageCache[imageName] = url;
              return url;
            });
          }
        })
      );

      if (Array.isArray(data)) {
        data = data.map((item, index) => {
          const imageUrl = imageUrls.find((url) =>
            url.includes(formatName(item.name))
          );
          return { ...item, id: index + 1, image: imageUrl || `/${type}.jpg` };
        });
        dispatch(setPlanets(data));
      } else {
        const imageUrl = imageUrls.find((url) =>
          url.includes(formatName(data.name || data.title))
        );
        data = { ...data, id: id, image: imageUrl || `/${type}.jpg` };
      }
      return data;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
