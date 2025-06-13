from fastapi import APIRouter, HTTPException
# from models.student import Student, UpdateStudent
# from backend.models.student import Student, UpdateStudent
from backend.models.student import Student, UpdateStudent
# from backend.database import student_collection
from backend.database.database import student_collection


# from database import student_collection
from bson import ObjectId

router = APIRouter()

# def student_helper(student) -> dict:
#     return {
#         "id": str(student["_id"]),
#         "name": student["name"],
#         "roll_no": student["roll_no"],
#         "age": student["age"],
#         "gender": student["gender"],
#         "class_name": student["class_name"]
#     }

def student_helper(student) -> dict:
    return {
        "id": str(student["_id"]),
        "firstname": student.get("firstname", ""),
        "surname": student.get("surname", ""),
        "address": student.get("address", ""),
        "gender": student.get("gender", ""),
        "mobile": student.get("mobile", ""),
        "telugu": student.get("telugu", ""),
        "hindi": student.get("hindi", ""),
        "english": student.get("english", ""),
        "maths": student.get("maths", ""),
        "science": student.get("science", ""),
        "social": student.get("social", ""),
    }




# @router.post("/")
# async def add_student(student: Student):
#     if await student_collection.find_one({"mobile": student.mobile}):  # 🔁 Changed
#         raise HTTPException(status_code=400, detail="Student with this mobile number already exists")
#     student_dict = student.dict()
#     result = await student_collection.insert_one(student_dict)
#     return {"id": str(result.inserted_id)}

@router.post("/")
async def add_student(student: Student):
    if await student_collection.find_one({"_id": student.id}):
        raise HTTPException(status_code=400, detail="Student with this ID already exists")
    student_dict = student.dict()
    student_dict["_id"] = student_dict.pop("id")  # Use custom ID as MongoDB _id
    await student_collection.insert_one(student_dict)
    return {"id": student_dict["_id"]}

@router.post("/")
async def add_student(student: Student):
    # Check if student ID already exists
    if await student_collection.find_one({"id": student.id}):
        raise HTTPException(status_code=400, detail="Student with this ID already exists")

    student_dict = student.dict()
    await student_collection.insert_one(student_dict)
    return {"id": student.id}



@router.get("/")
async def get_students():
    students = []
    async for s in student_collection.find():
        students.append(student_helper(s))
    return students

# @router.put("/{student_id}")
# async def update_student(student_id: str, student_data: UpdateStudent):
#     update_data = {k: v for k, v in student_data.dict().items() if v is not None}

#     result = await student_collection.update_one({"id": student_id}, {"$set": update_data})

#     if result.modified_count == 0:
#         raise HTTPException(status_code=404, detail="Student not found")

#     return {"message": "Student updated"}

# @router.post("/")
# async def add_student(student: Student):
#     # Check if student ID already exists
#     if await student_collection.find_one({"id": student.id}):
#         raise HTTPException(status_code=400, detail="Student with this ID already exists")

#     student_dict = student.dict()
#     await student_collection.insert_one(student_dict)
#     return {"id": student.id}




# @router.put("/{roll_no}")
# async def update_student(roll_no: int, student_data: UpdateStudent):
#     update_data = {k: v for k, v in student_data.dict().items() if v is not None}
#     result = await student_collection.update_one({"roll_no": roll_no}, {"$set": update_data})
#     if result.modified_count == 0:
#         raise HTTPException(status_code=404, detail="Student not found")
#     return {"message": "Student updated"}

# @router.delete("/{roll_no}")
# async def delete_student(roll_no: int):
#     result = await student_collection.delete_one({"roll_no": roll_no})
#     if result.deleted_count == 0:
#         raise HTTPException(status_code=404, detail="Student not found")
#     return {"message": "Student deleted"}

# @router.delete("/{student_id}")
# async def delete_student(student_id: str):
#     try:
#         result = await student_collection.delete_one({"_id": ObjectId(student_id)})
#         if result.deleted_count == 1:
#             return {"message": "Deleted successfully"}
#         raise HTTPException(status_code=404, detail="Student not found")
#     except Exception:
#         raise HTTPException(status_code=400, detail="Invalid student ID")

@router.put("/{student_id}")
async def update_student(student_id: str, student_data: UpdateStudent):
    update_data = {k: v for k, v in student_data.dict().items() if v is not None}
    
    result = await student_collection.update_one({"id": student_id}, {"$set": update_data})
    
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Student not found")
    
    return {"message": "Student updated"}

@router.delete("/{student_id}")
async def delete_student(student_id: str):
    result = await student_collection.delete_one({"_id": student_id})  # ← No ObjectId here
    if result.deleted_count == 1:
        return {"message": "Deleted successfully"}
    raise HTTPException(status_code=404, detail="Student not found")



