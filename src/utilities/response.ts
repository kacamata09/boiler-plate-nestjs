import { HttpException, HttpStatus } from '@nestjs/common';

type OKProps = {
  message?: string;
  data: any;
};

type NotFoundProps = {
  error?: string;
};
const response = {
  OK: ({ message, data }: OKProps) => ({
    status: HttpStatus.OK,
    data,
    message,
  }),
  SUBMITTED: ({ message, data }: OKProps) => ({
    status: HttpStatus.CREATED,
    data,
    message,
  }),
  NOT_FOUND: ({ error = 'Entry not found' }: NotFoundProps = {}) => {
    throw new HttpException(
      {
        status: HttpStatus.NOT_FOUND,
        error,
      },
      HttpStatus.NOT_FOUND,
    );
  },
  BAD: ({ error }: { error: string }) => {
    throw new HttpException(
      {
        status: HttpStatus.BAD_REQUEST,
        error,
      },
      HttpStatus.BAD_REQUEST,
    );
  },
  UNAUTHORIZED: () => {
    throw new HttpException(
      {
        status: HttpStatus.UNAUTHORIZED,
        error: 'Anda tidak memiliki akses untuk route ini',
      },
      HttpStatus.UNAUTHORIZED,
    );
  },
};

export default response;