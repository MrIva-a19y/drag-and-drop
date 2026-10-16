const addbtn = document.querySelector("#add");
const taskcontainer = document.querySelector(".new-task");
const tasklist = document.querySelector(".task-list");
const taskinput = document.querySelector("#new-task-input");
const tasksubmit = document.querySelector("#new-task-submit");
const taskcancel = document.querySelector("#new-task-cancel");
const newRoomAction = document.querySelector("#add-room");
const newRoomCancel = document.querySelector("#new-room-cancel");
const roominput = document.querySelector("#new-room-input");
const newRoomSubmit = document.querySelector("#new-room-submit");
const roomlist = document.querySelector(".rooms-container");
const roomcolor = document.querySelector("#room-color");

document.addEventListener("DOMContentLoaded", () => {
  const roomLength = roomlist.children.length;
  const taskLength = tasklist.children.length;

  if (roomLength === 0) {
    const noRooms = document.createElement("span");
    noRooms.className = "no-room-avilable";
    noRooms.textContent = "No Rooms avilable yet.";
    roomlist.appendChild(noRooms);
  }
  if (taskLength === 0) {
    const noTask = document.createElement("span");
    noTask.className = "no-task-avilable";
    noTask.textContent = "No Tasks avilable yet.";
    tasklist.appendChild(noTask);
  }
});

addbtn.addEventListener("click", () => {
  taskcontainer.style.display = "flex";
  document.querySelector(".task-bg").style.display = "flex";
  taskinput.focus();
});

taskcancel.addEventListener("click", () => {
  taskcontainer.style.display = "none";
  document.querySelector(".task-bg").style.display = "none";
});

document.querySelector(".task-bg").addEventListener("click", () => {
  taskcontainer.style.display = "none";
  document.querySelector(".task-bg").style.display = "none";
});

newRoomAction.addEventListener("click", (e) => {
  e.preventDefault();
  taskcontainer.style.display = "none";
  document.querySelector(".task-bg").style.display = "none";
  document.querySelector(".new-room").style.display = "flex";
  roominput.focus();
});

tasksubmit.addEventListener("click", (e) => {
  e.preventDefault();
  const taskvalue = taskinput.value.trim();
  if (taskvalue !== "") {
    const taskitem = document.createElement("li");
    taskitem.classList.add("task-item");
    const deleteTask = document.createElement("button");
    deleteTask.classList.add("btn-cancel-task");
    deleteTask.textContent = "X";
    taskitem.id = "taskitem";
    taskitem.setAttribute("draggable", "true");
    taskitem.textContent = taskvalue;
    taskitem.appendChild(deleteTask);
    tasklist.appendChild(taskitem);
    notifaction("Task created successfully");
    if (document.querySelector(".no-task-avilable")) {
      tasklist.removeChild(document.querySelector(".no-task-avilable"));
    }
    taskinput.value = "";
    taskcontainer.style.display = "none";
    document.querySelector(".task-bg").style.display = "none";
  }
  if (taskvalue === "") {
    alert("Please enter a task.");
  }
});
// rooms functionality

newRoomCancel.addEventListener("click", () => {
  document.querySelector(".new-room").style.display = "none";
});

newRoomSubmit.addEventListener("click", (e) => {
  e.preventDefault();

  const roomvalue = roominput.value.trim();
  if (roomvalue !== "") {
    const roomitem = document.createElement("div");
    roomitem.id = "dropZone";
    roomitem.classList.add("room-content");
    roomitem.style.border = `1px solid ${roomcolor.value}`;
    const taskcounter = document.createElement("span");
    taskcounter.classList.add("task-counter");
    const roomheaderContainer = document.createElement("div");

    roomheaderContainer.classList.add("room-header");
    //   const roomHeaderOptions = document.createElement("div");
    const roomheader = document.createElement("h3");
    roomheaderContainer.style.borderBottom = `3px solid ${roomcolor.value}`;
    roomheader.textContent = roomvalue;
    taskcounter.textContent = 0;
    roomheaderContainer.appendChild(roomheader);
    roomheaderContainer.appendChild(taskcounter);
    roomitem.appendChild(roomheaderContainer);
    roomlist.appendChild(roomitem);
    notifaction("room created successfully");
    if (document.querySelector(".no-room-avilable")) {
      roomlist.removeChild(document.querySelector(".no-room-avilable"));
    }
    roominput.value = "";
    document.querySelector(".new-room").style.display = "none";
  }
});
// Drag and drop function

// select all room
const rooms = document.querySelectorAll(".room-content");

// select all draggable
const draggable = document.querySelectorAll(".task-item");

// for each draggable create classname when dragging and remove when dont
const itemsobserv = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    mutation.addedNodes.forEach((node) => {
      if (node.nodeType === Node.ELEMENT_NODE && node.matches(".task-item")) {
        node.addEventListener("dragstart", (e) => {
          e.target.classList.add("dragging");
        });
        node.addEventListener("dragend", (e) => {
          e.target.classList.remove("dragging");
        });
      }
    });
  });
});
itemsobserv.observe(tasklist, { childList: true });

const roomobserv = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    mutation.addedNodes.forEach((ele) => {
      if (ele.nodeType === Node.ELEMENT_NODE && ele.matches(".room-content")) {
        observeRoom(ele);
        ele.addEventListener("dragover", () => {
          const draggable = document.querySelector(".dragging");
          ele.appendChild(draggable);
        });
        ele.addEventListener("dragleave", () => {});
      }
    });
  });
});
roomobserv.observe(document.querySelector(".rooms-container"), {
  childList: true,
});

function observeRoom(room) {
  const countObserv = new MutationObserver(() => {
    const taskCount = room.querySelectorAll(":scope > .task-item").length;
    // console.log("room dropped task count", taskCount);
    document.querySelector(".task-counter").textContent = taskCount || 0;
  });

  countObserv.observe(room, { childList: true });
}

document.querySelectorAll(".room-content").forEach(observeRoom);

// notifaction pop-up
function notifaction(content) {
  const container = document.createElement("div");
  container.classList.add("notifaction");
  container.style.left = "0px";
  const textHeader = document.createElement("h4");
  textHeader.textContent = content;
  container.appendChild(textHeader);
  document.body.appendChild(container);
  setTimeout(() => {
    document.body.removeChild(container);
  }, 1000);
}
