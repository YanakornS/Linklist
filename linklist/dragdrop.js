let carriageCount = 0;
let dragged;
   

document.addEventListener('DOMContentLoaded', (event) => {
    const train = document.getElementById('train');

    // สร้างฟังก์ชันเพิ่มโบกี้ใหม่
   window.addCarriage = function () {
     if (carriageCount < 15) {
       // เพิ่มเงื่อนไขตรวจสอบจำนวนโบกี้
       carriageCount++;
       const newCarriage = document.createElement("div");
       newCarriage.className = "carriage";
       newCarriage.setAttribute("draggable", true);
       newCarriage.id = "carriage" + carriageCount;
       //newCarriage.textContent = "โบกี้ " + carriageCount;
       train.appendChild(newCarriage);
       addDragEvents(newCarriage);
       // สร้างแท็ก <img> เพื่อแสดงรูปภาพ
       const img = document.createElement("img");
       //img.src = "PNG/โบกี้-removebg-preview.png"; // ตั้งค่า src ของรูปภาพ
       //img.alt = ""; // ตั้งค่าคำอธิบายรูปภาพ (alt text)
       // กำหนดขนาดของรูปภาพ
        //img.style.width = '50px';
        //img.style.height = '50px';
        
       // เพิ่มรูปภาพลงในโบกี้
       newCarriage.appendChild(img);
     } else {
        //เพิ่มให้ไม่เกิน 15 โบกี้
       alert("ไม่สามารถเพิ่มโบกี้เพิ่มได้อีก เพราะมีโบกี้ครบ 15 คันแล้ว");
     }
   };

    const addDragEvents = (item) => {
        item.addEventListener('dragstart', (e) => {
            dragged = item;
            e.dataTransfer.setData('text/plain', item.id);
        });
    };
    

    // จัดการกับการลากและวาง
    // (เพิ่มเหตุการณ์ dragover และ drop ตามตัวอย่างก่อนหน้า)
 train.addEventListener('dragover', (e) => {
        e.preventDefault(); // อนุญาตให้วาง
    });

    train.addEventListener('drop', (e) => {
        e.preventDefault();
        if (dragged && e.target.className === 'carriage') {
            // หาโบกี้ที่อยู่ใกล้ที่สุดและวางโบกี้ที่ลากมาก่อนหรือหลัง
            const afterElement = getDragAfterElement(train, e.clientX);
            if (afterElement == null) {
                train.appendChild(dragged);
            } else {
                train.insertBefore(dragged, afterElement);
            }
        }
        
    });
    
    

// ฟังก์ชันหาโบกี้ที่ควรจะวางโบกี้ที่ลากมาต่อหน้าหรือหลัง
function getDragAfterElement(container, x) {
    const draggableElements = [...container.querySelectorAll('.carriage:not(.dragging)')];

    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = x - box.left - box.width / 2;
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}

});


// สร้างฟังก์ชันลบโบกี้
window.removeCarriage = function(carriageId) {
    const carriageToRemove = document.getElementById(carriageId);
    if (carriageToRemove) {
        carriageToRemove.remove();
        carriageCount--;
    }
};

// เพิ่มการจัดการเหตุการณ์ดับเบิ้ลคลิกเพื่อลบโบกี้
train.addEventListener('dblclick', (e) => {
    if (e.target.className === 'carriage') {
        removeCarriage(e.target.id);
    }
});

window.removeAllCarriages = function () {
  const train = document.getElementById("train");
  train.innerHTML = ""; // ลบโบกี้ทั้งหมดที่อยู่ในรถไฟ
  carriageCount = 0; // รีเซ็ตค่านับจำนวนโบกี้
};

window.showCarriageCount = function () {
  const carriageCountElement = document.getElementById("carriageCount");
  carriageCountElement.textContent = carriageCount;
  // สร้างฟังก์ชันเพื่อแสดงจำนวนโบกี้ตลอดเวลา
  window.setInterval(function () {
    showCarriageCount();
  }, 100); // อัปเดตทุกๆ 1 วินาที (1000 มิลลิวินาที)
};



// เหตุการณ์ dragover และ drop สามารถเพิ่มตามตัวอย่างก่อนหน้า






