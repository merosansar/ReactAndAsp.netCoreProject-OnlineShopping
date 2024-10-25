﻿using System;
using System.Collections.Generic;

namespace OnlineShoppingReactAndAsp.netCore.Server.Models;

public partial class TblAddressType
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string? Description { get; set; }

    public virtual ICollection<TblAddress> TblAddresses { get; set; } = new List<TblAddress>();
}
