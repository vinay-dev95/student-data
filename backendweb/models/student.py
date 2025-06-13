from pydantic import BaseModel

class Student(BaseModel):
    id: str
    firstname: str
    surname: str
    address: str
    gender: str
    mobile: str
    telugu: str
    hindi: str
    english: str
    maths: str
    science: str
    social: str

class UpdateStudent(BaseModel):
    firstname: str | None = None
    surname: str | None = None
    address: str | None = None
    gender: str | None = None
    mobile: str | None = None
    telugu: str | None = None
    hindi: str | None = None
    english: str | None = None
    maths: str | None = None
    science: str | None = None
    social: str | None = None
