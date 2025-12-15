import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { SwaggerTheme, SwaggerThemeNameEnum } from "swagger-themes";
import { writeFileSync } from "fs";

export function setupSwagger(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle("Tech Quiz API")
    .setDescription("Tech Quiz API documentation")
    .setVersion("1.0")
    .addServer(
      process.env.NODE_ENV === "production"
        ? "https://engsoft.agendfy.shop/api"
        : "http://localhost:3000",
    )
    .addBearerAuth(
      {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        description: 'JWT Authorization header using the Bearer scheme. Example: "Authorization: Bearer {token}"',
      },
      'bearerAuth',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  document.security = [{ bearerAuth: [] }];

  const theme = new SwaggerTheme();

  writeFileSync('./swagger.json', JSON.stringify(document, null, 2), 'utf-8');

  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
    customCss: theme.getBuffer(SwaggerThemeNameEnum.DARK),
  });
}