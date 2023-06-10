#include "Class.h"

static void LocalGetter(js::LazyPropertyContext& ctx)
{
    ctx.Return(alt::ICore::Instance().GetLocalPlayer());
}

static void GetByID(js::FunctionContext& ctx)
{
    if(!ctx.CheckArgCount(1)) return;

    uint32_t id;
    if(!ctx.GetArg(0, id)) return;

    alt::IBaseObject* entity = alt::ICore::Instance().GetBaseObjectByID(alt::IBaseObject::Type::PLAYER, id);
    ctx.Return(entity);
}

// clang-format off
extern js::Class sharedPlayerClass;
extern js::Class playerClass("Player", &sharedPlayerClass, nullptr, [](js::ClassTemplate& tpl)
{
    tpl.BindToType(alt::IBaseObject::Type::PLAYER);

    tpl.Property<&alt::IPlayer::IsTalking>("isTalking");
    tpl.Property<&alt::IPlayer::GetMicLevel>("micLevel");
    tpl.Property<&alt::IPlayer::GetSpatialVolume, &alt::IPlayer::SetSpatialVolume>("spatialVolume");
    tpl.Property<&alt::IPlayer::GetNonSpatialVolume, &alt::IPlayer::SetNonSpatialVolume>("nonSpatialVolume");

    tpl.StaticLazyProperty("local", LocalGetter);

    tpl.StaticFunction("getByID", GetByID);
});