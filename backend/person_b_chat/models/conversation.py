from typing import Optional
from pydantic import BaseModel


class UserProfile(BaseModel):
    """
    Information collected from the citizen during conversation.
    """

    intent: Optional[str] = None

    age: Optional[int] = None
    occupation: Optional[str] = None
    income: Optional[int] = None
    state: Optional[str] = None
    category: Optional[str] = None