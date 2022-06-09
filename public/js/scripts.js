const messageDeleteButtons = document.querySelectorAll(
  ".message-delete-button .material-icons",
);
const messageFilter = document.querySelectorAll(".message-filter-container");

const collection_items = document.querySelectorAll(".collection-item");

(() => {
  collectionsButtonShowOnHover();
  collectionsButtonHideOnHover();
})();

function collectionsButtonShowOnHover() {
  for (let i = 0; i < collection_items.length; i++) {
    const collection = collection_items[i];
    const deleteButton = messageDeleteButtons[i];
    collection.addEventListener("mouseenter", () => {
      deleteButton.style.visibility = "visible";
    });
  }
}

function collectionsButtonHideOnHover() {
  for (let i = 0; i < collection_items.length; i++) {
    const collection = collection_items[i];
    const deleteButton = messageDeleteButtons[i];
    collection.addEventListener("mouseleave", () => {
      deleteButton.style.visibility = "hidden";
    });
  }
}

document.body.addEventListener("load", e => {
  console.log(e);
});
