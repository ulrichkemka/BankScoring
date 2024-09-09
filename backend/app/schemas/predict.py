from typing import Optional
from beanie import PydanticObjectId
from pydantic import BaseModel, EmailStr, Field
from uuid import UUID


class PredictBase(BaseModel):
    """
    Shared User properties. Visible by anyone.
    """

    first_name: Optional[str] = None
    last_name: Optional[str] = None
    picture: Optional[str] = None
