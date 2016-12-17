using System;
using System.Reflection;
using Microsoft.AspNetCore.SignalR.Infrastructure;
using Newtonsoft.Json.Serialization;

namespace Community.ContractResolvers
{
    /**
     * Class: SignalRContractResolver
     * Purpose: Ensures that SignalR JSON responses sent to the client are camelCase
     * Methods:
     *   SignalRContractResolver() - Initializes with a camel case contract resolver
     *   ResolveContract(Type type) - Establishes a camelCase contract resolver
     */
    public class SignalRContractResolver : IContractResolver
    {
        private readonly Assembly _assembly;
        private readonly IContractResolver _camelCaseContractResolver;
        private readonly IContractResolver _defaultContractSerializer;

        public SignalRContractResolver()
        {
            _defaultContractSerializer = new DefaultContractResolver();
            _camelCaseContractResolver = new CamelCasePropertyNamesContractResolver();
            _assembly = typeof(Connection).GetTypeInfo().Assembly;
        }

        public JsonContract ResolveContract(Type type)
        {
            if (type.GetTypeInfo().Assembly.Equals(_assembly))
                return _defaultContractSerializer.ResolveContract(type);

            return _camelCaseContractResolver.ResolveContract(type);
        }
    }
}