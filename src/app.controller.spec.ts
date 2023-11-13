import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SMSRuModule } from 'node-sms-ru/nestjs';
import { Request, Response } from 'express';

describe('AppController', () => {
  let appController: AppController;

  const reqMock = {
    query: {},
  } as unknown as Request;

  const statesResMap = {
    send: jest.fn((x) => x),
  };

  const resMock = {
    status: jest.fn((x) => statesResMap),
    // send: jest.fn((y) => y),
    send: jest.fn((x) => x),
  } as unknown as Response;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [SMSRuModule.forRoot({ api_id: process.env.API_KEY })],
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  it('Should be defined', () => {
    expect(appController).toBeDefined();
  });

  describe('getAll', () => {
    it('Should return a status of 400', () => {
      appController.getAll(reqMock, resMock);
      expect(resMock.status).toHaveBeenCalledWith(400);
      expect(statesResMap.send).toHaveBeenCalledWith({
        msg: 'Missing query param',
      });
    });

    it('Should return a status of 200 when we are have some params and queries', () => {
      reqMock.query = {
        count: '10',
        page: '2',
      };
      appController.getAll(reqMock, resMock);
      expect(resMock.send).toHaveBeenCalledWith(200);
    });
  });
});
