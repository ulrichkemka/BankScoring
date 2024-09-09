from typing import List, Optional, Any
from uuid import UUID

from fastapi import APIRouter, HTTPException, Body, Depends
from pymongo import errors
from pydantic.networks import EmailStr
from beanie.exceptions import RevisionIdWasChanged

from ..auth.auth import (
    get_hashed_password,
    get_current_active_superuser,
    get_current_active_user,
)
from .. import schemas, models

router = APIRouter()


@router.post("", response_model=schemas.User)
async def register_client(
    password: str = Body(...),
    email: EmailStr = Body(...),
    first_name: str = Body(None),
    last_name: str = Body(None),
):
    """
    Register a new client.
    """
    hashed_password = get_hashed_password(password)
    client = models.Client(
        email=email,
        hashed_password=hashed_password,
        first_name=first_name,
        last_name=last_name,
    )
    try:
        await client.create()
        return client
    except errors.DuplicateKeyError:
        raise HTTPException(
            status_code=400, detail="Client with that email already exists."
        )


@router.get("", response_model=List[schemas.Client])
async def get_users(
    limit: Optional[int] = 10,
    offset: Optional[int] = 0,
    admin_user: models.Client = Depends(get_current_active_superuser),
):
    clients = await models.Client.find_all().skip(offset).limit(limit).to_list()
    return clients


@router.patch("/{clientid}", response_model=schemas.Client)
async def update_user(
    clientid: UUID,
    update: schemas.ClientUpdate,
    admin_user: models.User = Depends(get_current_active_superuser),
) -> Any:
    """
    Update a client.

    ** Restricted to superuser **

    Parameters
    ----------
    clientid : UUID
        the user's UUID
    update : schemas.ClientUpdate
        the update data
    current_user : models.Client, optional
        the current superuser, by default Depends(get_current_active_superuser)
    """
    client = await models.Client.find_one({"uuid": clientid})
    if update.password is not None:
        update.password = get_hashed_password(update.password)
    client = client.model_copy(update=update.model_dump(exclude_unset=True))
    try:
        await client.save()
        return client
    except errors.DuplicateKeyError:
        raise HTTPException(
            status_code=400, detail="Client with that email already exists."
        )


@router.get("/{clientid}", response_model=schemas.Client)
async def get_user(
    clientid: UUID, admin_user: models.User = Depends(get_current_active_superuser)
):
    """
    Get User Info

    ** Restricted to superuser **

    Parameters
    ----------
    clientid : UUID
        the client's UUID

    Returns
    -------
    schemas.Client
        Client info
    """
    client = await models.Client.find_one({"uuid": clientid})
    if client is None:
        raise HTTPException(status_code=404, detail="Client not found")
    return client


@router.delete("/{clientid}", response_model=schemas.Client)
async def delete_user(
    clientid: UUID, admin_user: models.Client = Depends(get_current_active_superuser)
):
    client = await models.Client.find_one({"uuid": clientid})
    await client.delete()
    return client
