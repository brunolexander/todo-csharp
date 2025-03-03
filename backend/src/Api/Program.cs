using System.Reflection;
using System.Text.Json.Serialization;
using TodoBack.Application.Interfaces;
using TodoBack.Application.Services;
using TodoBack.Infrastructure.Interfaces;
using TodoBack.Infrastructure.Services;
using TodoBack.Infrastructure.Repositories;

var builder = WebApplication.CreateBuilder(args);

// Adicionar serviços de API
builder.Services.AddControllers();

// Adicionar serviços ao contêiner.
// Saiba mais sobre como configurar Swagger/OpenAPI em https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();


// Configurar Swagger/OpenAPI
builder.Services.AddSwaggerGen(config =>
{
    config.EnableAnnotations();

    var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
    var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
    config.IncludeXmlComments(xmlPath);
});

// Configurar o serializer JSON
builder.Services.ConfigureHttpJsonOptions(options =>
{
    options.SerializerOptions.Converters.Add(new JsonStringEnumConverter());
});

// Injetar 
builder.Services.AddScoped<ITarefaService, TarefaService>();
builder.Services.AddScoped<ITarefaRepository, TarefaRepository>();
builder.Services.AddScoped<IDatabaseService>(sp => 
    new DatabaseService(sp.GetRequiredService<IConfiguration>())
);


var app = builder.Build();

// Configurar swagger UI no ambiente de desenvolvimento
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Configurar o pipeline de solicitação HTTP.
app.UseHttpsRedirection();

// Mapear rotas da API
app.MapControllers()
    .WithOpenApi();

app.Run();