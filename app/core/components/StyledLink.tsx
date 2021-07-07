import React, { MouseEventHandler } from 'react';
import {
  BorderProps,
  LayoutProps,
  Link as ChakraLink,
  SpaceProps,
  TextDecorationProps,
  TypographyProps,
} from '@chakra-ui/react';
import { Link, RouteUrlObject } from 'blitz';

type StyledLinkProps = SpaceProps &
  TextDecorationProps &
  BorderProps &
  TypographyProps &
  LayoutProps & {
    href: RouteUrlObject | string;
    onClick?: MouseEventHandler;
    children: React.ReactNode;
  };

const StyledLink = ({ href, children, ...rest }: StyledLinkProps) => (
  <Link href={href}>
    <ChakraLink {...rest}>{children}</ChakraLink>
  </Link>
);

export default StyledLink;
