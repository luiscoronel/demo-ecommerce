import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loggerGlobal } from './middlewares/logger.middleware';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { DataSource } from 'typeorm';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'verbose', 'debug'],
  });
  const dataSource = app.get(DataSource);

  dataSource.initialize().then(() => {
    console.log('🚀 Conexión a la base de datos exitosa y tablas creadas');
  }).catch((err) => {
    console.error('❌ Error al conectar a la base de datos', err);
  });

  const options = new DocumentBuilder()
    .setTitle('Proyecto Integrador M4-Back de E-Commerce')
    .setDescription('Aplicacion creada con NestJS')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    exceptionFactory: (errors) => {
      const cleanErrors = errors.map(error => {
        return { property: error.property, constraints: error.constraints }
      });
      return new BadRequestException({
        alert: "Se han detectado los siguientes errores en la peticion y te mandamos estos mensajes personalizados",
        errors: cleanErrors,
      })
    }
  }));
  app.use(loggerGlobal);
  await app.listen(3000);
}
bootstrap();
